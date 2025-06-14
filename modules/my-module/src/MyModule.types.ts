import type { ViewProps } from "react-native";

export type OnLoadEventPayload = {
	url: string;
};

export type MyModuleEvents = {
	onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
	value: string;
};

export type MyModuleViewProps = {
	// url: string;
	// onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
	// style?: StyleProp<ViewStyle>;
	animation: string;
} & ViewProps;
