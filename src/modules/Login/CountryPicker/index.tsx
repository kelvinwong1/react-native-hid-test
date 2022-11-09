import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { flags, images } from '../../../themes';
import SearchCountryInput from './SearchCountryInput';
import FlatListSeparator from './FlatListSeparator';
import CountryPickerEmpty from './CountryPickerEmpty';
import type {
  Countries,
  Country,
  CountryPickerProps,
  FlagType,
} from '../Login.interface';
import styles from '../styles';
import { Context } from '../../../core/Context';
import { getDialCode } from '../../../helpers';

const countries: Countries = require('../../../../assets/json/countries.json');

const arrCountry = Object.keys(countries).map((key) => {
  return countries[key as FlagType];
});

function Index(props: CountryPickerProps) {
  const { onSelected, onCountryPickerShow } = props;

  const { countryCode } = useContext(Context);
  const [visible, setVisible] = React.useState(false);
  const [countries, setCountries] = React.useState(arrCountry);

  const resetCountries = () => {
    setCountries(arrCountry);
  };

  const toggleModal = () => {
    setVisible(!visible);
  };

  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnSelected = React.useCallback((item: Country) => {
    toggleModal();
    onSelected(item);
  });

  const handleOnCountryChange = React.useCallback(
    (country: string) => {
      if (!country.length) {
        setCountries(arrCountry);
      } else {
        const filterCountries = countries.filter((filtered) =>
          filtered.name.includes(country)
        );

        setCountries(filterCountries);
      }
    },
    [countries]
  );

  const keyExtractor = (item: Country) => item.name;

  const renderItem = ({ item }: { item: Country }) => {
    const imageSource = flags[item.iso2];

    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => handleOnSelected(item)}
      >
        <View style={styles.itemFlag}>
          <Image
            source={imageSource}
            style={styles.iconFlag}
            resizeMode="contain"
          />
          <Text style={styles.countryText}>{item.name}</Text>
          <Text style={styles.countryCodeText}>{`+${item.dialCode}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.3} onPress={toggleModal}>
        <View style={styles.containerInputCountryCode}>
          <Image
            source={flags[countryCode]}
            resizeMode="contain"
            style={styles.iconFlag}
          />
          <Text style={styles.placeholderCountryCode}>
            {`+${getDialCode(countryCode)}`}
          </Text>
          <Image source={images.arrowDown} style={styles.arrowDown} />
        </View>
      </TouchableOpacity>
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={visible}
        coverScreen={true}
        style={styles.modalCountryPicker}
        onModalHide={resetCountries}
        onModalShow={onCountryPickerShow}
        onBackButtonPress={toggleModal}
      >
        <View>
          <SearchCountryInput
            onChangeText={handleOnCountryChange}
            onCancel={toggleModal}
          />
          <FlatList
            keyExtractor={keyExtractor}
            data={countries}
            renderItem={renderItem}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={15}
            ItemSeparatorComponent={FlatListSeparator}
            ListEmptyComponent={CountryPickerEmpty}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </>
  );
}

export default React.memo(Index);
