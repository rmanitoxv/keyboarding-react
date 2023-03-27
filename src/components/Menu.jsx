import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { register } from "swiper/element/bundle";
import Basics from "./Basics";
import SpeedTypeWord from "./SpeedTypeWord";
import SpeedTypeParagraph from "./SpeedTypeParagraph";
register();

function Menu() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <div>
      <button
        className="shadow-xl text-7xl font-bold rounded-3xl px-20 py-2 bg-gradient-to-b from-yellow-200 to-orange-400 text-white font-raleway"
        onClick={() => setOpen(true)}
      >
        start
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full mx-8 my-8">
                    <swiper-container navigation>
                      <swiper-slide>
                        <Basics />
                      </swiper-slide>
                      <swiper-slide>
                        <SpeedTypeWord />
                      </swiper-slide>
                      <swiper-slide>
                        <SpeedTypeParagraph />
                      </swiper-slide>
                    </swiper-container>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Menu;
