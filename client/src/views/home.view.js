import React from "react";
import Layout from "../components/layout.component";
import World from "../components/world.component";

const Home = () => {
  return (
    <Layout>
      <World width={400} height={400} />
    </Layout>
  );
};

export default Home;
