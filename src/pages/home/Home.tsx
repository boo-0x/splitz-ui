import React from "react";
import "./Home.css";

const Home = (): JSX.Element => {
    return (
        <div className="margin-y-auto">
            <div className="logo-home">
                <img src="/img/logo_full.png" className="logo-black"></img>
                <img src="/img/logo_full_white.png" className="logo-white"></img>
            </div>
            <div className="content-home">
                <div className="home-summary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, lectus
                    quis dictum dapibus, libero odio ornare massa, at sagittis risus ante et libero.
                    Praesent lobortis maximus elit, eu dictum mauris rutrum eget. Ut et dignissim
                    felis. Donec laoreet nunc mauris, vitae faucibus risus finibus congue. Integer
                    metus enim, volutpat egestas nisi vel, dignissim pulvinar nunc. Aliquam faucibus
                    maximus ligula sit amet ullamcorper. Aenean nec arcu a felis tempus vestibulum.
                    Quisque ut lobortis purus.
                </div>
                <div className="home-section">
                    <div className="section-title">
                        <div className="title">Title</div>
                    </div>
                    <div className="section-content">
                        <p>
                            Every Splitzer is a smart contract that will automatically split any
                            amount of REEF or ERC-20 tokens that the contract receives amoung all
                            the owners. You can assign different percentages of the total shares for
                            each owners.
                        </p>
                    </div>
                </div>
                <div className="home-section">
                    <div className="section-content">
                        <p>
                            The owners can interact with the Splitzer to withdraw their share of the
                            available REEF or ERC-20 tokens at any time.
                        </p>
                    </div>
                    <div className="section-title">
                        <div className="title">Title</div>
                    </div>
                </div>
                <div className="home-section">
                    <div className="section-title">
                        <div className="title">Title</div>
                    </div>
                    <div className="section-content">
                        <p>
                            The owners can also pull REEF from another contract to the Splitzer
                            contract, if that contact has a widthaw() function. This is useful to
                            interact with contracts that only allow to trigger the withdrawal of
                            REEF to the recipient of the funds. Such type of contracts include Sqwid
                            marketplace.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
