type GenerateSwrOptions = {
    className:string
    classPath:string
    methods:string
    initiatedClassExportName:string
    classConstructorOptions: string
    extraImports?:string
    outputPath:string
}

function generateSwr(options:GenerateSwrOptions){
    let fileText = imports
    + fetcherImport(options)
    +types
    +generateHooks(options)

    Deno.writeTextFile(outputPath,fileText)
}

const imports = `import useSWR, { SWRResponse, SWRConfiguration } from "swr";
import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
`

function fetcherImport(options:GenerateSwrOptions){
    return `import { ${options.className} } from "${options.path}";
${options.extraImports?options.extraImports:''}
export const ${options.initiatedClassExportName} = new ${options.className}(${options.classConstructorOptions});
`
}

const types = `type AsyncFunction = (...args: any) => Promise<any>;
export type GetDataT<T extends AsyncFunction> = ReturnType<Awaited<T>>;
export type GetArgT<T extends (...args: any) => any> = Parameters<T>[0];
`

function generateHooks(options:GenerateSwrOptions){
    const text = [...new Set(options.methods)].map(method=>{
        const capitalizedMethod = method[0].toUpperCase() + method.substr(1);
        return `
export type Use${capitalizedMethod}Data = GetDataT<${options.className}["${method}"]>;
export type Use${capitalizedMethod}Arg = GetArgT<${options.className}["${method}"]>;
export type Use${capitalizedMethod}FetcherConfig = SWRMutationConfiguration<Use${capitalizedMethod}Data, any, Use${capitalizedMethod}Arg>;
export type Use${capitalizedMethod}FetcherResponse = SWRResponse<Use${capitalizedMethod}Data, any>;
export type Use${capitalizedMethod}MutationConfig = SWRMutationConfiguration<Use${capitalizedMethod}Data, any, Use${capitalizedMethod}Arg>;
export type Use${capitalizedMethod}MutationResponse = SWRMutationResponse<Use${capitalizedMethod}Data, any, Use${capitalizedMethod}Arg>;
/**
 * use${capitalizedMethod}Fetcher
 * See https://swr.vercel.app/docs/data-fetching
 */
export const use${capitalizedMethod}Fetcher = (
    arg?: Use${capitalizedMethod}Arg,
    config?: Use${capitalizedMethod}FetcherConfig
  ) =>
    useSWR(
      [${options.initiatedClassExportName}.${method}.name, arg],
      ([_,arg]) => ${options.initiatedClassExportName}.${method}(arg),
      config
    ) as Use${capitalizedMethod}FetcherResponse;
/**
 * use${capitalizedMethod}Mutation
 * See https://swr.vercel.app/docs/mutation
 */
export const use${capitalizedMethod}Mutation = (config?: Use${capitalizedMethod}MutationConfig) =>
    useSWRMutation(
        ${options.initiatedClassExportName}.${method}.name,
      (_, { arg }) => ${options.initiatedClassExportName}.${method}(arg),
      config
    ) as Use${capitalizedMethod}MutationResponse;
`
    })
}
