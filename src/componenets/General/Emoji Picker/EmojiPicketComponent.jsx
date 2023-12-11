import React, { Fragment, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Menu, Transition } from "@headlessui/react";

const EmojiPicketComponent = ({ onEmojiSelectionFunction }) => {
  const [showEmojiPicker, setShowEmojiPicket] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    // console.log("Events,0", event.emoji, emojiObject);

    const emoji = event?.emoji;
    onEmojiSelectionFunction({ messageInput: emoji }, {});
    // setChosenEmoji(emojiObject); // Set the chosen emoji
    // setShowEmojiPicket(false); // Close the emoji picker
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {/* Trigger for the dropdown */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-40 bottom-24 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {/* {showEmojiPicker ? ( */}
            <EmojiPicker onEmojiClick={onEmojiClick} />
            {/* ) : null} */}
          </Menu.Items>
        </Transition>
        <Menu.Button
          // onClick={(e) => setShowEmojiPicket(!showEmojiPicker)}
          className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          😊
        </Menu.Button>
        {/* </button> */}
      </Menu>
    </>
  );
};

export default EmojiPicketComponent;
