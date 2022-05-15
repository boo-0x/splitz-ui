import React from "react";
import "./Home.css";

const Home = (): JSX.Element => {
    return (
        <div className="margin-auto">
            <div className="logo-home">
                <img src="/logo_full.png" className="logo-black"></img>
                <img src="/logo_full_white.png" className="logo-white"></img>
            </div>
            <div className="content-home">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, lectus
                quis dictum dapibus, libero odio ornare massa, at sagittis risus ante et libero.
                Praesent lobortis maximus elit, eu dictum mauris rutrum eget. Ut et dignissim felis.
                Donec laoreet nunc mauris, vitae faucibus risus finibus congue. Integer metus enim,
                volutpat egestas nisi vel, dignissim pulvinar nunc. Aliquam faucibus maximus ligula
                sit amet ullamcorper. Aenean nec arcu a felis tempus vestibulum. Quisque ut lobortis
                purus.
            </div>
        </div>
    );
};

export default Home;
