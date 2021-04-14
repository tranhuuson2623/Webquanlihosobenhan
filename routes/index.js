module.exports = {
    getHomePage: (req, res) => {
        const search = req.query.search;
        let query = "";

        if (search) {
            query = "SELECT * FROM `benhnhan` where hovaten like '%" + search + "%' ORDER BY id ASC";
        } else {
            query = "SELECT * FROM `benhnhan` ORDER BY id ASC";
        }

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            } else {
                res.render('index.ejs', {
                    title: 'Quản lí bệnh nhân',
                    benhnhans: result
                });
            }
        });
    },
};