module.exports.generateRestrictions = (rank, id) => {
  // *** Nullish/false restrictions means user hasn't been restricted in anyway.
  let restrictions = {
    isRestricted: false,
  };

  // ~> Student Restrictions
  if (rank === "student") {
    restrictions = {
      isRestricted: true,
      paths: [
        {
          path: `/users/${id}`,
          methods: ["GET", "PUT"],
        },
        // ? Example usage
        // {
        //   path: `/users`,
        //   methods: ["GET"],
        // },
      ],
    };
  }
  return restrictions;
};

module.exports.isPermitted = (req, restrictions) => {
  const { isRestricted, paths } = restrictions;

  // *** Proceed if no restrictions were issued
  if (!isRestricted) return true;

  const requestedPath = req.originalUrl;
  const requestedMethod = req.method;

  // *** Setup global return result
  let result = false;

  // *** Break exception for foreach purposes (prevent looping through all paths even after matching)
  const Break = {};
  try {
    paths.forEach((pathset) => {
      const { path, methods } = pathset;

      console.log(methods.includes(requestedMethod));

      if (methods.includes(requestedMethod) && requestedPath == path) {
        result = true;
        throw Break;
      }
    });
  } catch {}

  // *** Return restrictions check result
  return result;
};
