
export const STATUSES = [
  {
    key: "Applied",
    label: "Applied",
    color: "rgb(100, 116, 139)",          
    background: "rgb(233, 243, 252)",     
  },
  {
    key: "Interview",
    label: "Interview",
    color: "rgb(217, 119, 6)",          
    background: "rgb(255, 249, 225)",     
  },
  {
    key: "Offer",
    label: "Offer",
    color: "rgb(5, 150, 105)",          
    background: "rgb(228, 251, 240)",     
  },
  {
    key: "Rejected",
    label: "Rejected",
    color: "rgb(220, 38, 38)",          
    background: "rgb(252, 234, 234)",    
  },
];

export const status = Object.fromEntries(
  STATUSES.map((status) => [status.key, status])
);