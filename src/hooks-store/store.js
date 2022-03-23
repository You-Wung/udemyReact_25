import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];//setState
let actions = {};//TOGGLE_FAV

export const useStore = (shouldListen = true) => {
	const setState = useState(globalState)[1];// set만 받기

	const dispatch = (actionId, payload) => {
		const newState = actions[actionId](globalState, payload);//redux에서 일어나는일
		globalState = { ...globalState, ...newState };
		for (const listener of listeners) {
			listener(globalState);
		}
		console.log(actions);
	};
	
	useEffect(() => {
		if (shouldListen)
			listeners.push(setState);

		return () => {
			//언마운트? 언레지스트되면 파괴함.
			if (shouldListen)
				listeners = listeners.filter((li) => li !== setState);
		};
	}, [setState, shouldListen]);
	return [globalState, dispatch];
};

export const initStore = (userAction, intialState) => {
	if (intialState)
		globalState = { ...globalState, ...intialState };
	actions = {...actions, ...userAction};
}; 