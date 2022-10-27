import React from "react";
import Wrapper from "../HOC/Wrapper";
import DashBalance from "../components/DashBalance";
import Transaction from "../components/Transaction";
import { BiWallet } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

const Wallet = () => {
  return (
    <Wrapper>
      <>
        <DashBalance />
        <div>
          <p>Transactions</p>
          <div>
            <Transaction
              icon={<BiWallet className="text-3xl text-white" />}
              color="green"
              title="Wallet funded!"
              amount="$ 40"
            />
            <Transaction
              icon={<FiSend className="text-3xl text-white" />}
              color="pink"
              title="Transfer successful!"
              amount="-$ 30"
            />
            <Transaction
              icon={<BiWallet className="text-3xl text-white" />}
              color="green"
              title="Wallet funded!"
              amount="$ 40"
            />
            <Transaction
              icon={<FiSend className="text-3xl text-white" />}
              color="pink"
              title="Transfer successful!"
              amount="-$ 30"
            />
            <Transaction
              icon={<BiWallet className="text-3xl text-white" />}
              color="green"
              title="Wallet funded!"
              amount="$ 40"
            />
            <Transaction
              icon={<FiSend className="text-3xl text-white" />}
              color="pink"
              title="Transfer successful!"
              amount="-$ 30"
            />
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Wallet;
