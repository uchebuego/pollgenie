import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, getContract, http } from "viem";
import { mainnet } from "viem/chains";
import { abi } from "../abis/PollGenie.json";

interface CreatePollArgs {
  title: string;
  description: string;
  options: string[];
}

interface VoteArgs {
  pollId: number;
  optionId: string;
}

const client = createClient({
  chain: mainnet,
  transport: http(),
});

const contract = getContract({
  abi,
  client,
  address: "0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005",
});

export function usePollGenie() {
  const queryClient = useQueryClient();

  const getPolls = async () => {
    const result = await contract.read.getAllPolls();
    return result;
  };

  const createPoll = async ({
    title,
    description,
    options,
  }: CreatePollArgs) => {
    const result = await contract.write.createPoll([
      title,
      description,
      options,
    ]);
    return result;
  };

  const vote = async ({ pollId, optionId }: VoteArgs) => {
    const result = await contract.write.vote([pollId, optionId]);
    return result;
  };

  const closePoll = async (pollId: string) => {
    const result = await contract.write.closePoll([pollId]);
    return result;
  };

  return {
    getPolls: useQuery({
      queryKey: ["polls"],
      queryFn: getPolls,
    }),
    createPoll: useMutation({
      mutationFn: createPoll,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
      },
    }),
    vote: useMutation({
      mutationFn: vote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
      },
    }),
    closePoll: useMutation({
      mutationFn: closePoll,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
      },
    }),
  };
}
