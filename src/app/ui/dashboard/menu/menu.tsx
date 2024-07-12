import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


export default function Menu({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <Transition show={open} as={Fragment}>
      <div className="fixed inset-0 flex z-40">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute w-screen h-screen bg-black bg-opacity-50" onClick={() => setOpen(false)} />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative w-full max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 py-6 sm:px-6">
                <h1 className="text-lg font-medium text-gray-900">Menu</h1>
              </div>
              {/* Content goes here */}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
