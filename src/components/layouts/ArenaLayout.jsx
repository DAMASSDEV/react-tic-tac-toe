import React from "react";

const ArenaLayout = ({ textPlayer, children }) => {
  return (
    <>
      <header>
        <h1 className="title">
          Welcome To Tic Tac Toe
          <br />
          Damassdev
        </h1>
      </header>
      <main>
        <section id="title-player">
          <div className="box-player">
            <p className="text-player">{textPlayer}</p>
          </div>
        </section>
        <section id="main-player">{children}</section>
      </main>
    </>
  );
};

const BoxLeft = ({ children }) => {
  return <article className="mainbox-left">{children}</article>;
};

const BoxRight = ({ children }) => {
  return <article className="mainbox-right">{children}</article>;
};

ArenaLayout.BoxLeft = BoxLeft;
ArenaLayout.BoxRight = BoxRight;

export default ArenaLayout;
