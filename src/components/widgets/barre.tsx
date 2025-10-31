import React, { useState, useEffect, useRef } from 'react';
import { WidgetLink } from './link';
import { WidgetDefinition } from './widget'; 

const PARAM_MYCUSTOMPARAM = 'myCustomParam';

const DEFAULT_MYCUSTOMPARAM = false;

function useUrlParams() {
  const [params, setParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => setParams(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', handlePopState);

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      setParams(new URLSearchParams(window.location.search));
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return params;
}

const Component: React.FC = () => {
  const params = useUrlParams();
  const myCustomParam =
    params.get(PARAM_MYCUSTOMPARAM) === 'true' ||
    params.get(PARAM_MYCUSTOMPARAM) === '1' ||
    DEFAULT_MYCUSTOMPARAM;

  return (
    <div>
      Ma barre, valeur de myCustomParam: '{myCustomParam.toString()}'
    </div>
  );
};

const Configurator: React.FC = () => {
  const [myCustomParam, setMyCustomParam] = useState(DEFAULT_MYCUSTOMPARAM);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (myCustomParam !== DEFAULT_MYCUSTOMPARAM) url.searchParams.set(PARAM_MYCUSTOMPARAM, myCustomParam.toString());
    else url.searchParams.delete(PARAM_MYCUSTOMPARAM);

    window.history.replaceState(null, '', url.toString());
  }, [myCustomParam]);

  const paramString = new URLSearchParams({
    widget: 'barre',
    ...(myCustomParam !== DEFAULT_MYCUSTOMPARAM ? { myCustomParam: myCustomParam.toString() } : {}),
  }).toString();

  return (
    <>
      <h4>Options</h4>
      <label>
        Paramètre custom:
        <input type="checkbox" checked={myCustomParam} onChange={e => setMyCustomParam(e.target.checked)} />
      </label>
      <WidgetLink params={paramString} />
    </>
  );
};

export const Barre: WidgetDefinition = {
  displayName: "Barre",
  component: Component,
  configurator: Configurator,
};