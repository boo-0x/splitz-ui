import React from "react";
import "./Home.css";

const Home: React.FC<any> = ({ children }): JSX.Element => {
    return (
        <div className="margin-y-auto">
            <div className="logo-home">
                <img src="/img/logo_full.png" className="logo-black"></img>
                <img src="/img/logo_full_white.png" className="logo-white"></img>
            </div>
            <div className="content-home">
                <div className="home-summary margin-y-auto">
                    <p>
                        Splitz allows you to split payments amoung several addresses in the Reef
                        network.
                    </p>
                    <p>
                        Every Splitzer is a secure smart contract that will automatically split any
                        amount of REEF or ERC-20 tokens that the contract receives amoung all the
                        owners.
                    </p>

                    {children}
                </div>

                <div className="home-section">
                    <div className="section-title">
                        <div className="title">Create</div>
                    </div>
                    <div className="section-content">
                        <p>
                            Create a new Splitzer specifying the list of owners and their ownership
                            percentages. You can create any number of shares and distribute among
                            the owners as you wish.
                        </p>
                    </div>
                </div>
                <div className="home-section">
                    <div className="section-title">
                        <div className="title">Split</div>
                    </div>
                    <div className="section-content">
                        <p>
                            The tokens received in the Splitzer will be distributed among all the
                            owners proportionally to their number of shares. Owners can interact
                            with the Splitzer to withdraw their share of the available REEF or
                            ERC-20 tokens at any time.
                        </p>
                    </div>
                </div>
                <div className="home-section">
                    <div className="section-title">
                        <div className="title">Pull</div>
                    </div>
                    <div className="section-content">
                        <p>
                            Splitzer owners can also pull REEF from another contract to the Splitzer
                            contract, if that contact has a <b>withdraw()</b> function. This is
                            useful to interact with contracts that only allow to trigger the
                            withdrawal of REEF to the recipient of the funds. Such type of contracts
                            include <b>Sqwid marketplace</b>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
