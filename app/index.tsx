import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import { MyModuleView } from "../modules/my-module";

export default function Index() {
	const { width, height } = useWindowDimensions();

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<MyModuleView
				animation={Platform.OS === "android" ? "0" : "Walk"}
				style={{ width, height }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
