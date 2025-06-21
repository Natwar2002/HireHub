/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  useDisclosure,
  Chip,
} from "@heroui/react";
import PostJobModal from "../../../component/Modal/PostJobModal";
import { Resume } from "../../../component/resume/Resume";
import { useDashboardData } from "../../../hooks/jobPost/useDashboardData";

export const columns = [
  { name: "No", uid: "id", sortable: true },
  { name: "CANDIDATE NAME", uid: "name", sortable: true },
  { name: "RESUME/CV", uid: "resume", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name", 
  "resume",
  "role",
  "status",
  "actions",
];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]); // Changed to state instead of hardcoded array
  const { HrJobs } = useDashboardData();
  
  // Process API data when HrJobs changes
  useEffect(() => {
    if (HrJobs && HrJobs.length > 0) {
      const candidates = HrJobs.map((job, index) => ({
        id: index + 1, // Generate sequential ID for table display
        _id: job.userId._id, // Keep original _id for reference
        name: job.userId.username,
        username: job.userId.username, // For search functionality
        email: job.userId.email,
        avatar: job.userId.avatar,
        role: job.jobDetails.jobTitle,
        status: job.status,
        resume: job.userId.resume || "", // Add resume field if available
      }));
      setUsers(candidates);
    }
  }, [HrJobs]);

  const [filterValue, setFilterValue] = React.useState("");
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  // eslint-disable-next-line no-unused-vars
  const [jobsFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    

    return filteredUsers;
  }, [users, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={user.name}
          >
            {user.email}
          </User>
        );
      case "resume":
        return (
          <div>
            <Resume userId={user._id} />
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status": {
        let fromColor = "from-indigo-500";
        let toColor = "to-pink-500";
        
        switch (user.status?.toLowerCase()) {
          case "rejected":
            fromColor = "from-red-700";
            toColor = "to-red-500";
            break;
          case "accepted":
            fromColor = "from-green-500";
            toColor = "to-green-800";
            break;
          case "seen":
            fromColor = "from-yellow-500";
            toColor = "to-yellow-800";
            break;
          case "applied":
            fromColor = "from-blue-400";
            toColor = "to-blue-600";
            break;
          default:
            fromColor = "from-gray-400";
            toColor = "to-gray-600";
        }

        return (
          <div className="flex flex-col">
            <Chip
              classNames={{
                base: `bg-gradient-to-b ${fromColor} ${toColor} capitalize text-center min-w-[80px] border-small border-white/50 shadow-pink-500/30`,
                content: "drop-shadow shadow-black text-white",
              }}
              variant="shadow"
            >
              {capitalize(user?.status)}
            </Chip>
          </div>
        );
      }
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2 ">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="accept">Accept</DropdownItem>
                <DropdownItem key="reject">Reject</DropdownItem>
                <DropdownItem key="view">View Details</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "id":
        return <span className="text-bold text-sm">{cellValue}</span>;
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              onPress={onOpenChange}
              color="primary"
              endContent={<PlusIcon />}
            >
              Add Job Post
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} candidates
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onOpenChange, onRowsPerPageChange, onClear, users.length]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Candidates table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[71vh]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No candidates found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PostJobModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}