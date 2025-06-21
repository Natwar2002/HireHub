import React from "react";

function CommonButton({ isPending, isSuccess, text, onClickHandler,isApplied }) {
  return (
    <button
      type="submit"
      className={`text-white ${ isApplied? "bg-gradient-to-b from-[#3ad754] via-[#008817] to-[#008015]":"bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0]"} hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-7 py-3 flex justify-center items-center gap-5`}
      disabled={isPending || isApplied}
      onClick={onClickHandler}
    >
      
      {isPending || isSuccess ? `loading...` : text}
      {isPending ||
        (isSuccess && <LucideLoader className="animate-spin ml-2" />)}
    </button>
  );
}

export default CommonButton;
