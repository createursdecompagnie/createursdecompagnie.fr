import React, { useState, useEffect } from 'react';
import { WidgetLink } from '@site/src/components/widgets/editor/link'; 
import { WidgetDefinition } from '@site/src/components/widgets/index'; 

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

const Editor: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  
  const [myCustomParam, setMyCustomParam] = useState(() => {
    const val = params.get(PARAM_MYCUSTOMPARAM);
    return val === 'true' || val === '1' || DEFAULT_MYCUSTOMPARAM;
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    
    url.searchParams.set('widget', Barre.id);

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
  id: "barre",
  displayName: "Barre",
  component: Component,
  editor: Editor,
};