export async function onRequestPost(context) {

  const { code } = await context.request.json();

  const user = await context.env.DB
    .prepare(
      "SELECT * FROM users WHERE code = ?"
    )
    .bind(code)
    .first();

  if (!user) {
    return Response.json({
      valid: false,
      message: "کد اشتراک نامعتبر است"
    });
  }

  const now = new Date();
  const expire = new Date(user.expire_date);

  if (now > expire) {
    return Response.json({
      valid: false,
      message: "اشتراک شما منقضی شده است"
    });
  }

  return Response.json({
    valid: true,
    message: "اشتراک فعال است"
  });

}
