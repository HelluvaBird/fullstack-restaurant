'use client';

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div
      id="contact"
      className="h-[50vh] bg-green-50 text-center grid place-items-center px-4"
    >
      <div className="max-w-xl w-full mx-auto">
        <p className="text-xl text-green-800">get in touch</p>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer bg-red-600 px-1 rounded-md group">
            <PhoneIcon className="w-5 h-5 text-white group-hover:text-green-300 transition-colors" />
            <span className="whitespace-nowrap text-white group-hover:text-green-300 transition-colors">
              123 456 7890
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer bg-red-600 px-1 rounded-md group">
            <EnvelopeIcon className="w-5 h-5 text-white group-hover:text-green-300 transition-colors" />
            <span className="whitespace-nowrap text-white group-hover:text-green-300 transition-colors">
              hello@maxximu.com
            </span>
          </div>
        </div>
        <p className="text-3xl mt-8 text-green-800">send us a message</p>
        <form
          className="max-w-xl w-full grid gap-4 mx-auto mt-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg text-lg border border-green-300 placeholder:text-green-700"
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Example@email.com"
                className="w-full px-4 py-2 rounded-lg text-lg border border-green-300 placeholder:text-green-700"
              />
            </label>
          </div>
          <label htmlFor="">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              cols={30}
              rows={5}
              placeholder="Message here"
              className="w-full px-4 py-2 rounded-lg text-lg border border-green-300 placeholder:text-green-700"
            ></textarea>
          </label>
          <div className="justify-self-start">
            <button className=" bg-green-700 text-white font-bold tracking-wider p-4 rounded-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
