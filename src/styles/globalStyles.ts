import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 55 : 52,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 14,
        fontFamily: fontFamilies.regular,
        color: colors.text,

    },

    section: {
        marginBottom: 16,
    },

    inputContainer: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    },

    tag: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 100,
        backgroundColor: colors.blue,
    },
});