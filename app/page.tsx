import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
