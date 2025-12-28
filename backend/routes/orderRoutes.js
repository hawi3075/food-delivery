router.post('/', async (req, res) => {
    try {
        const { items, total, address } = req.body;
        const newOrder = new Order({
            user: req.user._id, // From Auth middleware
            items,
            total,
            address,
            status: 'Pending'
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Order placement failed" });
    }
});