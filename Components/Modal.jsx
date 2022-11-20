import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useToggleWithClickOutside } from "../hooks/useToggleWithClickOutside";
import { useModalContext } from "./ModalContextProvider";

const Modal = () => {
  const node = useRef();
  const [spaces, setSpaces] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    space_name: "",
    start: "",
    end: "",
    user_email: "",
    additionalInfo: "",
  });
  const { isOpen: isLocalOpen, toggle } = useToggleWithClickOutside(node);
  const { setIsOpen, isOpen } = useModalContext();

  useEffect(() => {
    getSpaces();
  }, []);

  useEffect(() => {
    toggle(isOpen);
  }, [isOpen, toggle]);

  useEffect(() => {
    if (!isLocalOpen) {
      setIsOpen(false);
    }
  }, [isLocalOpen, setIsOpen]);

  async function getSpaces() {
    await fetch("https://api.varmeverket.com/v2/spaces", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setSpaces(data);
      });
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://api.varmeverket.com/v2/bookings", {
      body: JSON.stringify(formValues),
      headers: {
        contentType: "application/json",
      },
      method: "POST",
    });

    if (response.status >= 400) {
      setError("Something didn't go as planned. Try refreshing the page.");
    } else {
      setIsSubmitted(true);
    }
  };

  const handleChange = (event) => {
    setFormValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  function FormModal() {
    return (
      <form
        onSubmit={onSubmit}
        style={{ width: "clamp(300px, 90vw, 800px)" }}
        className="relative grid m-auto p-4 bg-gray-600 bg-opacity-80"
      >
        <button
          className="absolute right-4 top-4 font-GtAmericaExpandedBlack text-xs"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          X
        </button>
        <h2 className="font-GtAmericaExpandedBlack text-xl mb-8">
          BOOK A SPACE
        </h2>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-white" htmlFor="space_name">
              SELECT THE SPACE
            </label>
            <select
              required
              className="w-full p-4 bg-black bg-opacity-80"
              name="space_name"
              id="space_name"
              onChange={handleChange}
            >
              {spaces.map((item, index) => (
                <option
                  key={index}
                  value={item.name}
                  className="whitespace-normal"
                >
                  {item.name} {item.description}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-white" htmlFor="start">
                START DATE
              </label>
              <input
                required
                style={{ colorScheme: "dark" }}
                onChange={handleChange}
                name="start"
                id="start"
                className="p-4 bg-black bg-opacity-80"
                type="datetime-local"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-white" htmlFor="end">
                END DATE
              </label>
              <input
                required
                style={{ colorScheme: "dark" }}
                onChange={handleChange}
                name="end"
                id="end"
                className="p-4 bg-black bg-opacity-80"
                type="datetime-local"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-white" htmlFor="user_email">
              WRITE YOUR EMAIL
            </label>
            <input
              required
              style={{ colorScheme: "dark" }}
              onChange={handleChange}
              name="user_email"
              id="user_email"
              className="p-4 bg-black bg-opacity-80"
              type="email"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-white" htmlFor="additionalInfo">
              ADDITIONAL INFORMATION
            </label>
            <textarea
              onChange={handleChange}
              className="p-4 bg-black bg-opacity-80"
              name="additionalInfo"
              id="additionalInfo"
              cols="30"
              rows="5"
            />
          </div>
        </div>
        <button className="bg-gray-400 p-2 mt-4 ml-auto mb-4" type="submit">
          SEND REQUEST
        </button>
        {error && <p className="p-4 rounded bg-red-500">{error}</p>}
      </form>
    );
  }

  function SubmittedModal() {
    return (
      <div className="relative flex flex-col m-auto max-w-5xl w-[90vw] mb-8 p-8 bg-gray-600 bg-opacity-80">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-GtAmericaExpandedBlack text-xl">
            THANKS FOR BOOKING
          </h2>
          <button
            className="absolute right-4 top-4 font-GtAmericaExpandedBlack text-xl"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="grid place-items-center fixed inset-0 z-40 bg-black/50"
        >
          <div ref={node} className="h-[70vh] overflow-auto">
            {isSubmitted ? SubmittedModal() : FormModal()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
