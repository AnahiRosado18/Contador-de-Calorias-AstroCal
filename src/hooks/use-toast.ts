import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// --- CONSTANTES ---
const TOAST_LIMIT = 1; // Cuántos toasts se pueden mostrar a la vez
const TOAST_REMOVE_DELAY = 1000000; // Tiempo antes de remover un toast del DOM

// --- TIPOS ---
// Define la forma de un toast en el estado
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Define los tipos de acciones que podemos "despachar"
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

// --- ID GENERATOR ---
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// --- TIPOS DE ACCIÓN (para el reducer) ---
type ActionType = typeof actionTypes;
type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] };

// --- ESTADO ---
interface State {
  toasts: ToasterToast[];
}

// Map para guardar los 'setTimeout' de eliminación
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Añade un toast a la cola de eliminación después del delay.
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    // Despacha la acción para remover el toast del estado
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// --- REDUCER ---
/**
 * Una función pura que calcula el siguiente estado basado en el estado actual y una acción.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Añade el nuevo toast al inicio y corta la lista según TOAST_LIMIT
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      // "Dismiss" significa "cerrar". Pone 'open: false' y lo manda a la cola de eliminación.
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      // Remueve el toast del estado (y del DOM)
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// --- LÓGICA DE ESTADO GLOBAL (Patrón Pub/Sub) ---
// 'listeners' es un array de funciones (los 'setState' de los componentes)
const listeners: Array<(state: State) => void> = [];

// 'memoryState' es el estado global que vive fuera de React
let memoryState: State = { toasts: [] };

/**
 * Función central para despachar acciones.
 */
function dispatch(action: Action) {
  // 1. Calcula el nuevo estado usando el reducer
  memoryState = reducer(memoryState, action);
  // 2. Notifica a todos los "oyentes" (componentes) sobre el nuevo estado
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

/**
 * Función que se usa para CREAR un toast (ej. toast({ title: 'Hola' }))
 */
function toast({ ...props }: Toast) {
  const id = genId();

  // Funciones para actualizar o cerrar este toast específico
  const update = (props: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Despacha la acción para AÑADIR el toast
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // Retorna controles para este toast (aunque no se usan en tu app)
  return { id, dismiss, update };
}

/**
 * Hook de React que usan los componentes (como Toaster) para
 * "suscribirse" a los cambios del estado global de toasts.
 */
function useToast() {
  // Obtiene el estado actual de 'memoryState'
  const [state, setState] = React.useState<State>(memoryState);

  // Al montarse, el componente "suscribe" su 'setState' a la lista de listeners.
  React.useEffect(() => {
    listeners.push(setState);
    // Al desmontarse, se "desuscribe"
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state, // Retorna los toasts actuales
    toast,      // Retorna la función para crear toasts
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };