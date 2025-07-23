import ClientValue from "@/modules/ClientValue";
import DeliverFree from "@/modules/DeliverFree";
import FrameBasseyn from "@/modules/FrameBasseyn";
import Hero from "@/modules/Hero";
import InflatablePool from "@/modules/InflatablePool";
import Service from "@/modules/Service";
import TashkentPools from "@/modules/TashkentPools";

export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <FrameBasseyn />
      <InflatablePool />
      <DeliverFree />
      <ClientValue />
      <TashkentPools />
    </>
  );
}
