import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactToPrint from "react-to-print";

const Print = (componentRef) => {
  const onBeforeGetContentResolve = useRef(null);

  const [loadingPrint, setLoadingPrint] = useState(false);
  const [text, setText] = useState("old boring text");

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = useCallback(
    (e) => {
      console.log("`onBeforeGetContent` called");
      setLoadingPrint(true);
      setText("Loading new text...");

      return new Promise((resolve) => {
        onBeforeGetContentResolve.current = resolve;

        setTimeout(() => {
          setLoadingPrint(false);
          setText("New, Updated Text!");
          resolve();
        }, 2000);
      });
    },
    [setLoadingPrint, setText]
  );

  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <p className="cursor-pointer mb-[16px] bg-[#ed1c24] flex items-center justify-center  text-white w-full h-[50px]">
        Print
      </p>
    );
  }, []);

  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loadingPrint && (
        <p className="indicator">onBeforeGetContent: Loading...</p>
      )}
    </>
  );
};

export default Print;
