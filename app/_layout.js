import { Slot } from "expo-router";

// Import your global CSS file
import "../global.css"

export default function _layout() {
  return (
    <Slot name="layout">
      <Slot name="content" />
    </Slot>
  );
}
