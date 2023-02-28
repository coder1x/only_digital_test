import { FC, useState, useEffect } from 'react';

const Loading: FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 200);
  }, []);

  return <>{isActive && <span className="loading"></span>}</>;
};

export default Loading;
