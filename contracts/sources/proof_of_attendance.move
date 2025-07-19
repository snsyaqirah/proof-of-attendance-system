/*
/// Module: attendance_system
module attendance_system::contracts;
*/

// For Move coding conventions, see
// https://docs.iota.org/developer/iota-101/move-overview/conventions

module attendance_system::proof_of_attendance {
    use std::string;
    use iota::clock::{Self, Clock};
    use iota::event;
    use iota::table::{Self, Table};

    public struct AttendanceBadge has key {
        id: UID,
        event_id: ID,
        event_name: string::String,
        attendee: address,
        check_in_time: u64,
        verification_hash: vector<u8>,
        metadata: string::String,
    }

    public struct Event has key {
        id: UID,
        name: string::String,
        start_time: u64,
        end_time: u64,
        max_attendees: u64,
        current_attendees: u64,
        attendees: Table<address, bool>,
    }

    public struct BadgeMinted has copy, drop {
        badge_id: ID,
        event_id: ID,
        attendee: address,
        timestamp: u64,
    }

    public fun create_event(
        name: vector<u8>,
        start_time: u64,
        end_time: u64,
        max_attendees: u64,
        ctx: &mut TxContext
    ) {
        let event = Event {
            id: object::new(ctx),
            name: string::utf8(name),
            start_time,
            end_time,
            max_attendees,
            current_attendees: 0,
            attendees: table::new(ctx),
        };

        transfer::share_object(event);
    }

    public fun mint_attendance_badge(
        event: &mut Event,
        verification_code: vector<u8>,
        metadata: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let attendee = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);

        assert!(current_time >= event.start_time, 1);
        assert!(current_time <= event.end_time, 2);
        assert!(!table::contains(&event.attendees, attendee), 3);
        assert!(event.current_attendees < event.max_attendees, 4);

        table::add(&mut event.attendees, attendee, true);
        event.current_attendees = event.current_attendees + 1;

        let badge = AttendanceBadge {
            id: object::new(ctx),
            event_id: object::id(event),
            event_name: event.name,
            attendee,
            check_in_time: current_time,
            verification_hash: verification_code,
            metadata: string::utf8(metadata),
        };

        let badge_id = object::id(&badge);

        event::emit(BadgeMinted {
            badge_id,
            event_id: object::id(event),
            attendee,
            timestamp: current_time,
        });

        transfer::transfer(badge, attendee);
    }
}

