type GenerateSwrOptions = {
    className:string
    classPath:string
    methods:string
    initiatedClassExportName:string
    classConstructorOptions: string
}

function generateSwr(options:GenerateSwrOptions){
    let fileText = imports
    + fetcherImport(options)
    +types
    +generateFetchers(options)
    +generateMutations(options)
}

function generateFetchers(options:GenerateSwrOptions){
    const text = options.methods.map(method=>{
        const capitalizedMethod = ''
    })
}

function generateFetcher(){
/**
 * export type UseListMessageTemplatesT = GetFetcherType<
  NorskGassnettApi["listMessageTemplates"]
>;
export const useListMessageTemplates = (
  arg?: UseListMessageTemplatesT["arg"],
  config?: UseListMessageTemplatesT["config"]
) =>
  useSWR(
    [norskGassnettApi.listMessageTemplates.name, arg],
    () => norskGassnettApi.listMessageTemplates(),
    config
  ) as UseListMessageTemplatesT["data"];

 */

  return ``
}

function generateMutations(){

}

function generateMutation(){
/**
 * export type UseLoginT = GetMutationT<string, NorskGassnettApi["login"]>;
export const useLogin = (options?: UseLoginT["options"]) =>
  useSWRMutation(
    norskGassnettApi.login.name,
    (_, { arg }) => norskGassnettApi.login(arg),
    options
  ) as UseLoginT["hook"];

 */
}

const imports = `import useSWR, { BareFetcher, SWRResponse, SWRConfiguration, Key } from "swr";
import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
`

function fetcherImport(options:GenerateSwrOptions){
    return `import { ${options.className} } from "${options.path}";

export const ${options.initiatedClassExportName} = new ${options.className}(${options.classConstructorOptions});
`
}

const types = `type AsyncFunction = (...args: any) => Promise<any>;
export type GetDataT<T extends AsyncFunction> = ReturnType<Awaited<T>>;
export type GetArgT<T extends (...args: any) => any> = Parameters<T>[0];

/**
 * Mutations
 * See https://swr.vercel.app/docs/mutation
 */

export type GetMutationT<K extends Key, T extends AsyncFunction> = {
  data: GetDataT<T>;
  arg: GetArgT<T>;
  options: SWRMutationConfiguration<GetDataT<T>, any, GetArgT<T>, K>;
  hook: SWRMutationResponse<GetDataT<T>, any, GetArgT<T>, K>;
};

/**
 * Fetchers
 * See https://swr.vercel.app/docs/data-fetching
 */

export type GetFetcherType<T extends AsyncFunction> = {
  data: SWRResponse<GetDataT<T>, any>;
  arg: GetArgT<T>;
  config: SWRConfiguration<GetDataT<T>, any, T>;
};
`