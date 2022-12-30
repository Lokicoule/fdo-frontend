// FIX global is undefined in amazon-cognito-identity-js
(window satisfies Window).global = window;

export {};
