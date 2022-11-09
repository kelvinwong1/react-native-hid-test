import React from 'react';
import MainComponent from '../modules/MainComponent';
import type { IHumanIDProvider, MainComponentRef } from './core.interface';

const Provider: IHumanIDProvider = (): JSX.Element => {
  return <MainComponent ref={registerRef} />;
};

Provider.ref = null;

export function registerRef(ref: MainComponentRef) {
  Provider.ref = ref;
}

export default Provider;
