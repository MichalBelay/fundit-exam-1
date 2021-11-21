import React, { useState } from "react";
import { Match } from "./api";
export const Matches = ({
  matches,
  search,

}: {
  matches: Match[];
  search: string;
}) => {
  const filteredMatches = matches.filter((t) =>
    (
      /* here i add  search filters */
      t.borrower.user.firstName.toLowerCase() +
      t.borrower.user.lastName.toLowerCase() +
      t.borrower.user.email.toLowerCase() +
      t.companyName.toLowerCase()

    ).includes(search),

  );
  const [approve, setApprove] = useState(0);
  const [decline, setDecline] = useState(0);
  const onApprove = () => {
    setApprove(approve + 1)

  }
  const onDecline = () => {
    setDecline(decline + 1)
  }



  return (
    <ul className="matches">
      {filteredMatches.map((match) => (
        <li key={match.id} className="match">
          <h5 className="title">{match.companyName}</h5>
          <div className="matchData">
            <div>
              <p className="userDate">
                <b>Full Name:</b> {match.borrower.user.firstName}{" "}
                {match.borrower.user.lastName}
              </p>
              <p className="userDate">
                <b>Email:</b> {match.borrower.user.email}
              </p>
              <p className="userDate">
                <b>Amount Request: </b> {match.amountReq}
              </p>
              <p className="userDate">
                <b>Balance: </b> {match.borrower.financeData.balance}{" "}
                {match.borrower.financeData.currency}
              </p>
              <p className="userDate">
                <b>Credit Score:</b>
                {match.borrower.creditScore}
              </p>
            </div>
            <div className="score_buttons">
              {/* I add turnery if for credit score */}
              <p>{match.borrower.creditScore < 679 && match.borrower.creditScore > 579 ? <span id="score_B"> B</span> : (match.borrower.creditScore > 679 ? <span id="score_A"> A</span> : <span id="score_C"> C</span>)}</p>
              <div>
                <button id="Approve" onClick={onApprove} disabled={false}>Approve {approve}</button>

                <button id="Decline" onClick={onDecline}>Decline {decline}</button>
              </div>
            </div>
          </div>
          <footer>
            <div className="meta-data">
              Created At {new Date(match.creationTime).toLocaleString()}
            </div>
          </footer>
        </li>
      ))}
    </ul>
  );
};
