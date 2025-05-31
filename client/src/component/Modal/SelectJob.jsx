import {Select, SelectItem} from "@heroui/react";

export const SelectorIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  );
};

const JobType = [
  {key: "cat", label: "Full-time"},
  {key: "dog", label: "Part-time"},
  {key: "elephant", label: "Internship"},
  {key: "lion", label: "Contract"},
  {key: "tiger", label: "Freelance"},
];

export default function SelectJob() {
  return (
    <Select
      disableSelectorIconRotation
      className="max-w-xs"
      labelPlacement="inside"
      placeholder="Select Job Type"
      selectorIcon={<SelectorIcon />}
      required={true}
    >
      {JobType.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
}
