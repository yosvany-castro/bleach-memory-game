import React from "react";
import {useState} from "react"

const Aspect = ({aspectos}) => {
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);

  function addUpVote(e) {
    setUpVote(upVote + 1)
  }
  function addDownVote(e) {
    setDownVote(downVote + 1)
  }

  return (
    <div className="pa-10 w-300 card">
          <h2>{aspectos}</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button onClick={addUpVote} className="py-10 px-15" data-testid="upvote-btn-0">
              👍 Upvote
            </button>
            <button onClick={addDownVote} className="py-10 px-15 danger" data-testid="downvote-btn-0">
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-0">
            Upvotes: <strong>{upVote}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-0">
            Downvotes: <strong>{downVote}</strong>
          </p>
    </div>
  )
}

const FeedbackSystem = ({aspects}) => {
  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        <Aspect aspectos={"Readability"}/>
        <Aspect aspectos={"Performance"}/>
        <Aspect aspectos={"Security"}/>
        <Aspect aspectos={"Documentation"}/>
        <Aspect aspectos={"Testing"}/>
      </div>
    </div>
  );
};

export default FeedbackSystem;
