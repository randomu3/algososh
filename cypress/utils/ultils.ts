export const getCircle = (id: string | number) => {
    return id === "container" ? `[data-cy=${id}]` : `[data-cy="circle-${id}"]`;
  }