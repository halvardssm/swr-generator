import { generateSwr } from "./mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "generates correctly",
  fn: () => {
    const expected =
      `import useSWR, { SWRResponse, SWRConfiguration } from "swr";
import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import { className } from "classPath";

export const initiatedClassExportName = new className(classConstructorOptions);
type AsyncFunction = (...args: any) => Promise<any>;
export type GetDataT<T extends AsyncFunction> = ReturnType<Awaited<T>>;
export type GetArgT<T extends (...args: any) => any> = Parameters<T>[0];

export type UseMethodsData = GetDataT<className["methods"]>;
export type UseMethodsArg = GetArgT<className["methods"]>;
export type UseMethodsFetcherConfig = SWRMutationConfiguration<UseMethodsData, any, UseMethodsArg>;
export type UseMethodsFetcherResponse = SWRResponse<UseMethodsData, any>;
export type UseMethodsMutationConfig = SWRMutationConfiguration<UseMethodsData, any, UseMethodsArg>;
export type UseMethodsMutationResponse = SWRMutationResponse<UseMethodsData, any, UseMethodsArg>;
/**
 * useMethodsFetcher
 * See https://swr.vercel.app/docs/data-fetching
 */
export const useMethodsFetcher = (
    arg?: UseMethodsArg,
    config?: UseMethodsFetcherConfig
  ) =>
    useSWR(
      [initiatedClassExportName.methods.name, arg],
      ([_,arg]) => initiatedClassExportName.methods(arg),
      config
    ) as UseMethodsFetcherResponse;
/**
 * useMethodsMutation
 * See https://swr.vercel.app/docs/mutation
 */
export const useMethodsMutation = (config?: UseMethodsMutationConfig) =>
    useSWRMutation(
        initiatedClassExportName.methods.name,
      (_, { arg }) => initiatedClassExportName.methods(arg),
      config
    ) as UseMethodsMutationResponse;
`;
    const actual = generateSwr({
      className: "className",
      classPath: "classPath",
      methods: ["methods"],
      initiatedClassExportName: "initiatedClassExportName",
      classConstructorOptions: "classConstructorOptions",
      outputPath: "outputPath",
    });
    assertEquals(actual, expected);
  },
});
