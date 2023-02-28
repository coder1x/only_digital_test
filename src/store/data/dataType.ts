type Records = {
  id: number;
  year: number;
  text: string;
};

type HistoryData = {
  id: number;
  title: string;
  range: [number, number];
  records: Records[];
};

export { Records, HistoryData };
