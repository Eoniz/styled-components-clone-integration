import React from 'react';

interface IHOCProps {
    type: keyof React.ReactHTML;
    style: React.CSSProperties;
}

const HOC = (props: IHOCProps) => {
    return (childProps: any) => {
        const { children, ...rest } = childProps;
        return React.createElement(
            props.type,
            {
                style: props.style,
                ...rest
            },
            children
        );
    }
};

const reg = /(\w+):\s*(.+)/;

const constructStringLitteral = (props: TemplateStringsArray, ...rest: string[]) => {
    let r = "";
    props.forEach((value, i) => {
        r += value + (i < rest.length ? rest[i] : "");
    });

    return r;
}

const extractCSSProperties = (props: TemplateStringsArray, ...rest: string[]) => {
    const styleLitteral = (
        constructStringLitteral(props, ...rest)
            .replaceAll('\n', '')
            .split(';')
            .map((a) => a.trim())
            .filter((a) => a.length > 0)
    );

    const styleProps: Record<string, string> = {};

    for (const property of styleLitteral) {
        const results = property.match(reg);
        if (results === null) {
            continue;
        }
        if (results.length !== 3) {
            continue;
        }
        if (results[1] === null || results[2] === null) {
            continue;
        }

        styleProps[results[1]] = results[2];
    }

    return styleProps as React.CSSProperties;
}

const styled = {
    h1: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "h1", style: extractCSSProperties(props, ...rest)});
    },
    h2: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "h2", style: extractCSSProperties(props, ...rest)});
    },
    h3: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "h3", style: extractCSSProperties(props, ...rest)});
    },
    h4: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "h4", style: extractCSSProperties(props, ...rest)});
    },
    h5: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "h5", style: extractCSSProperties(props, ...rest)});
    },
    h6: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "h6", style: extractCSSProperties(props, ...rest)});
    },
    input: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "input", style: extractCSSProperties(props, ...rest)});
    },
    div: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "div", style: extractCSSProperties(props, ...rest)});
    },
    form: (props: TemplateStringsArray, ...rest: string[]) => {
        return HOC({type: "form", style: extractCSSProperties(props, ...rest)});
    },
};

export default styled;
