import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  EmitterSubscription,
} from 'react-native';
import styles from './styles';
import type { InputProps, OTPInputViewState } from './OTPInput.interface';

export default class OTPInputView extends Component<
  InputProps,
  OTPInputViewState
> {
  static defaultProps: InputProps = {
    pinCount: 6,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    editable: true,
    keyboardAppearance: 'default',
    keyboardType: 'number-pad',
    clearInputs: false,
    placeholderCharacter: '',
    selectionColor: '#000',
  };

  private fields: TextInput[] | null[] = [];
  private keyboardDidHideListener?: EmitterSubscription;
  private timer?: number | undefined;

  constructor(props: InputProps) {
    super(props);
    this.state = {
      digits: [],
      selectedIndex: props.autoFocusOnLoad ? 0 : -1,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.bringUpKeyBoardIfNeeded();
    }, 300);
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.keyboardDidHideListener?.remove();
  }

  bringUpKeyBoardIfNeeded = () => {
    const { autoFocusOnLoad, pinCount } = this.props;
    const digits = this.getDigits();
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      this.focusField(focusIndex);
    }
  };

  getDigits = () => {
    const { digits: innerDigits } = this.state;
    return innerDigits;
  };

  private handleKeyboardDidHide = () => {
    this.blurAllFields();
  };

  private notifyCodeChanged = () => {
    const { digits } = this.state;
    const code = digits.join('');
    const { onCodeChanged } = this.props;
    if (onCodeChanged) {
      onCodeChanged(code);
    }
  };

  private handleChangeText = (index: number, text: string) => {
    const { onCodeFilled, pinCount } = this.props;
    const digits = this.getDigits();
    let newdigits = digits.slice();
    // @ts-ignore
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = text.length;
    if (newTextLength - oldTextLength === pinCount) {
      // user pasted text in.
      newdigits = text.split('').slice(oldTextLength, newTextLength);
      this.setState({ digits: newdigits }, this.notifyCodeChanged);
    } else {
      if (text.length === 0) {
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        text.split('').forEach((value) => {
          if (index < pinCount) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
      this.setState({ digits: newdigits }, this.notifyCodeChanged);
    }

    let result = newdigits.join('');
    if (result.length >= pinCount) {
      onCodeFilled && onCodeFilled(result);
      this.focusField(pinCount - 1);
      this.blurAllFields();
    } else {
      if (text.length > 0 && index < pinCount - 1) {
        this.focusField(index + 1);
      }
    }
  };

  private handleKeyPressTextInput = (index: number, key: string) => {
    const digits = this.getDigits();
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        this.handleChangeText(index - 1, '');
        this.focusField(index - 1);
      }
    }
  };

  focusField = (index: number) => {
    if (index < this.fields.length) {
      (this.fields[index] as TextInput).focus();
      this.setState({
        selectedIndex: index,
      });
    }
  };

  blurAllFields = () => {
    this.fields.forEach((field: TextInput | null) =>
      (field as TextInput).blur()
    );
    this.setState({
      selectedIndex: -1,
    });
  };

  clearAllFields = () => {
    const { clearInputs } = this.props;
    if (clearInputs) {
      this.setState({ digits: [], selectedIndex: 0 });
    }
  };

  renderOneInputField = (_: TextInput, index: number) => {
    const {
      codeInputFieldStyle,
      codeInputHighlightStyle,
      secureTextEntry,
      editable,
      keyboardType,
      selectionColor,
      keyboardAppearance,
    } = this.props;
    const { defaultTextFieldStyle } = styles;
    const { digits } = this.state;
    const { clearInputs, placeholderCharacter, placeholderTextColor } =
      this.props;
    const { color: defaultPlaceholderTextColor } = {
      ...defaultTextFieldStyle,
      ...codeInputFieldStyle,
    };
    return (
      <View pointerEvents="none" key={index + 'view'} testID="inputSlotView">
        <TextInput
          testID="textInput"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={[
            defaultTextFieldStyle,
            digits?.[index] ? codeInputHighlightStyle : codeInputFieldStyle,
          ]}
          ref={(ref) => {
            this.fields[index] = ref;
          }}
          onChangeText={(text) => {
            this.handleChangeText(index, text);
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            this.handleKeyPressTextInput(index, key);
          }}
          value={!clearInputs ? digits[index] : ''}
          keyboardAppearance={keyboardAppearance}
          keyboardType={keyboardType}
          textContentType="none"
          key={index}
          selectionColor={selectionColor}
          secureTextEntry={secureTextEntry}
          editable={editable}
          placeholder={placeholderCharacter}
          placeholderTextColor={
            placeholderTextColor || defaultPlaceholderTextColor
          }
        />
      </View>
    );
  };

  renderTextFields = () => {
    const { pinCount } = this.props;
    const array = new Array(pinCount).fill(0);
    return array.map(this.renderOneInputField);
  };

  render() {
    const { pinCount, style, clearInputs } = this.props;
    const digits = this.getDigits();
    return (
      <View testID="OTPInputView" style={style}>
        <TouchableWithoutFeedback
          style={styles.touchable}
          onPress={() => {
            if (!clearInputs) {
              let filledPinCount = digits.filter((digit) => {
                return digit !== null && digit !== undefined;
              }).length;
              this.focusField(Math.min(filledPinCount, pinCount - 1));
            } else {
              this.clearAllFields();
              this.focusField(0);
            }
          }}
        >
          <View style={styles.containerTextField}>
            {this.renderTextFields()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
