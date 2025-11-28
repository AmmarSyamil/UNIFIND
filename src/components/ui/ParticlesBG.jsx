"use client";

import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from "react";

export default function ParticlesBG({ options }) {
  const init = React.useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={init}
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
