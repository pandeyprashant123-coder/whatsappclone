import { useContacts } from "@/context/ContactProvider";
import React, { useRef } from "react";
import { ImCross } from "react-icons/im";

const NewContactModel = ({ closeModel }: { closeModel: () => void }) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { createContact } = useContacts();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContact(idRef.current!.value, nameRef.current!.value);
    closeModel();
  };
  return (
    <>
      <div className="bg-white p-4 mt-2 mx-3 flex justify-between opacity-100 border-b">
        <h1 className="font-bold">Create contact</h1>
        <button onClick={closeModel}>
          <ImCross />
        </button>
      </div>
      <div className="bg-white p-4 mb-2 mx-3 flex justify-between opacity-100">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="id">Id</label>
            <input
              type="text"
              name=""
              id="id"
              ref={idRef}
              required
              className="border p-1"
            />
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name=""
              id="id"
              ref={nameRef}
              required
              className="border p-1"
            />
          </div>
          <button
            type="submit"
            className="bg-green-400 p-2 font-bold text-white mt-3 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewContactModel;
