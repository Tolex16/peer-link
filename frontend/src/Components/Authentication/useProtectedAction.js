import { useState } from "react";
import isAuthenticated from "./IsAuthenticated";

export default function useProtectedAction({ onRequireAuth }) {
  const [pendingAction, setPendingAction] = useState(null);

  const execute = (action, context = null) => {
    if (isAuthenticated()) {
      action(context);
    } else {
      setPendingAction(() => () => action(context));
      onRequireAuth(); // Trigger login modal
    }
  };

  const resolve = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return { execute, resolve };
}
