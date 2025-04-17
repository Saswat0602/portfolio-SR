import React from 'react';
import { Button } from "@/components/ui/button";

const RubiksCubeController = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button>Rotate X</Button>
      <Button>Rotate Y</Button>
      <Button>Rotate Z</Button>
    </div>
  );
};

export default RubiksCubeController;
