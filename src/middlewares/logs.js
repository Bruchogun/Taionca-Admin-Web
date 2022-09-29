export default async (req, res, next)=>{
    const body = {...req.body};
        delete body.password
    const path = req.originalUrl;
    const method = req.method;
    const params = req.params;
    const headers = req.headers;
    const user_session = req.session.user;

    const result = await res.sql`
        INSERT INTO public.logs
        ( body, path, method, params, headers, user_session )
        VALUES (${body}, ${path}, ${method}, ${params}, ${headers}, ${user_session})
        RETURNING id_log;
    `
    const id_log = result.rows[0].id_log;
    res.on("finish", ()=>{
        res.sql`
            UPDATE public.logs
            SET response_status_code = ${res.statusCode},
                response_status_message = ${res.statusMessage}
            WHERE id_log = ${id_log};
        `
    })
    next();
}




