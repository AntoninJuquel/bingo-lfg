import BingoPage from "@/pages/BingoPage";
import HomePage from "@/pages/HomePage";
import {
  createHashRouter,
  RouterProvider,
  LoaderFunction,
} from "react-router-dom";

const loader: LoaderFunction = async ({ params }) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`wss://${window.location.host}/${params.id}`);
    ws.onopen = () => {
      resolve(ws);
    };
    ws.onerror = (error) => {
      reject(error);
    };
  });
};

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/bingo/:id",
    loader,
    element: <BingoPage />,
    errorElement: <BingoPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
