export const scrollTo = (
  targetID: string,
  options?: { behavior?: ScrollOptions['behavior']; offset?: number },
) => {
  const { offset = 0, behavior = 'smooth' } = options || {};
  const target = document.getElementById(targetID);

  if (target) {
    const targetPosition = target.getBoundingClientRect().top;
    const offsetPosition = targetPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });
  }
};
