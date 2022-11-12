import { Result } from "postcss";
import { useState, useEffect } from "react";
import { useModalContext } from "./ModalContextProvider";

const Modal = () => {
  const [spaces, setSpaces] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [formValues, setFormValues] = useState({
    space_name: "",
    start: "",
    end: "",
    user_email: "",
    additionalInfo: "",
  });

  useEffect(() => {
    getSpaces();
    window.scrollTo(0, 0);
  }, []);

  async function getSpaces() {
    await fetch("https://api.varmeverket.com/v2/spaces", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setSpaces(data);
        return data;
      });
  }

  const { setIsOpen } = useModalContext();

  const onSubmit = (event) => {
    event.preventDefault();

    const response = fetch("https://api.varmeverket.com/v2/bookings", {
      body: JSON.stringify(formValues),
      headers: {
        contentType: "application/json",
      },
      method: "POST",
    });
    setIsSubmited(true);
    return response;
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
        className="relative flex flex-col m-auto max-w-5xl w-[90vw] mb-8 p-8 bg-gray-600 bg-opacity-80"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-GtAmericaExpandedBlack text-xl">BOOK A SPACE</h2>
          <button
            className="absolute right-4 top-4 font-GtAmericaExpandedBlack text-xs"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            X
          </button>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-white" htmlFor="space_name">
              SELECT THE SPACE
            </label>
            <select
              className="w-full p-4 bg-black bg-opacity-80"
              style={{ borderRight: "16px solid transparent" }}
              name="space_name"
              id="space_name"
              onChange={handleChange}
            >
              <option className="hidden"></option>
              {spaces.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name} {item.description}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <div className="grid gap-2 mr-4">
              <label className="text-white" htmlFor="start">
                CHOOSE START DATE
              </label>
              <input
                style={{ colorScheme: "dark" }}
                onChange={handleChange}
                name="start"
                id="start"
                className="p-4 bg-black bg-opacity-80"
                type="datetime-local"
              />
            </div>
            <div className="grid gap-2 mr-4">
              <label className="text-white" htmlFor="end">
                CHOOSE END DATE
              </label>
              <input
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
        <button className="bg-gray-400 p-2 mt-4 ml-auto" type="submit">
          SEND REQUEST
        </button>
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
    <div className="mt-32 md:mt-44">
      {isSubmited ? SubmittedModal() : FormModal()}
    </div>
  );
};

export default Modal;
