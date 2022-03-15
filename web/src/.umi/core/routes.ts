// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/xu hangyuan/Desktop/273lab1/web/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.tsx').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login/index.jsx').default
      },
      {
        "path": "/register",
        "exact": true,
        "component": require('@/pages/register/index.jsx').default
      },
      {
        "path": "/store",
        "exact": true,
        "component": require('@/pages/store/index.jsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
